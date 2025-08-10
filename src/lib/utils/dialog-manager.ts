import { mount, type SvelteComponent, unmount } from 'svelte';

interface MountResult<C extends SvelteComponent> {
	component: C;
}

class DialogManager {
	private container: HTMLElement | null = null;
	private activeDialogs: Map<string, MountResult<SvelteComponent>> = new Map();

	// eslint-disable-next-line
	showDialog<T extends Record<string, any>, C extends SvelteComponent>(
		id: string,
		// eslint-disable-next-line
		DialogComponent: new (...args: any[]) => C,
		props: T
	): void {
		this.close(id);

		const target = this.getContainer();

		const mountResult = mount(DialogComponent, {
			target,
			props: {
				...props,
				onClose: () => {
					this.close(id);
				}
			}
		}) as MountResult<C>;

		this.activeDialogs.set(id, mountResult);
	}

	async close(id: string): Promise<void> {
		const dialogResult = this.activeDialogs.get(id);
		if (!dialogResult) return;

		try {
			const dialogElement = this.container?.querySelector('dialog');
			if (dialogElement) {
				dialogElement.close();
			}

			await unmount(dialogResult);
		} catch (error) {
			console.warn(`Error closing dialog ${id}:`, error);
		} finally {
			this.activeDialogs.delete(id);

			if (this.container && !this.container.hasChildNodes()) {
				this.container.remove();
				this.container = null;
			}
		}
	}

	async closeAll(): Promise<void> {
		const dialogIds = Array.from(this.activeDialogs.keys());
		await Promise.all(dialogIds.map((id) => this.close(id)));
	}

	private getContainer(): HTMLElement {
		if (!this.container) {
			this.container = document.createElement('div');
			this.container.id = 'dialog-container';
			document.body.appendChild(this.container);
		}
		return this.container;
	}
}

export const dialogManager = new DialogManager();
