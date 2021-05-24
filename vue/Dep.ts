import Watcher from "./Watcher";

export default class Dep {

    static target: Watcher;

    static DeptId: number = 0;

    id: number;

    subs: Watcher[] = [];

    constructor() {
        this.id = Dep.DeptId++;
    }

    //释放依赖
    release(watchId: number) {
        this.subs = this.subs.filter(v => v.id != watchId)
    }

    append() {
        if (!this.subs.length || this.subs.every(v => v.id !== Dep.target.id)) {
            this.subs.push(Dep.target);
            Dep.target.deps.push(this);
        }
    }

    notify() {
        this.subs.forEach(v => {
            v.update()
        })
    }

}

export class ComputedDep extends Dep {

}