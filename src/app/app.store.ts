import { queryStore } from "@quinntyne/query-store";
import { of } from "rxjs";

export class AppStore extends queryStore(class { }) {
    public get() {
        return super.from$(() => of(new Date()),"DATE");
    }

    public refresh() {
        return super.withRefresh(of(true), "DATE").subscribe();
    }
}