import { mount, type SvelteComponent } from 'svelte';

interface DialogInstance {
	destroy: () => void;
}

class DialogManager {
	private container: HTMLElement | null = null;
	private activeDialogs: Map<string, DialogInstance> = new Map();

	private getContainer(): HTMLElement {
		if (!this.container) {
			this.container = document.createElement('div');
			this.container.id = 'dialog-container';
			document.body.appendChild(this.container);
		}
		return this.container;
	}
	public show<T extends Record<string, any>, C extends SvelteComponent>(
		id: string,
		DialogComponent: new (...args: any[]) => C,
		props: T
	): void {
		// Destroy existing dialog with same ID if it exists
		this.close(id);

		const target = this.getContainer();
		const { destroy } = mount(DialogComponent, {
			target,
			props
		});

		this.activeDialogs.set(id, {
			destroy: () => {
				destroy();
				this.activeDialogs.delete(id);

				// Clean up container if empty
				if (this.container && !this.container.hasChildNodes()) {
					this.container.remove();
					this.container = null;
				}
			}
		});
	}

	public close(id: string): void {
		const dialog = this.activeDialogs.get(id);
		if (dialog) {
			dialog.destroy();
		}
	}

	public closeAll(): void {
		this.activeDialogs.forEach((dialog) => dialog.destroy());
		this.activeDialogs.clear();
	}
}

export const dialogManager = new DialogManager();
