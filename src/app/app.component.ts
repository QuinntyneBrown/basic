import { Observable, of, Subject } from "rxjs";
import { html, render } from "lit";
import "./app.component.scss";
import { async } from "./async.directive";
import { AppStore } from "./app.store";


export class AppComponent extends HTMLElement {
    private readonly _appStore = new AppStore();
    private readonly _destroyed$: Subject<void> = new Subject();
    public readonly date$: Observable<any> = this._appStore.get();

    refresh() {
        this._appStore.refresh();
    }

    get template() {
        return html`            
            <button @click=${() => this.refresh()}>Refresh</button>
            <p>${async(this.date$)}</p            
            >`;
    }

    connectedCallback() {    
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        render(this.template, this.shadowRoot as DocumentFragment)  
    }
    
    disconnectedCallback() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
