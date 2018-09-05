import { Tapable } from 'tapable';

type FN = (...args: any[]) => void;

// tslint:disable-next-line:no-empty
const noop: FN = () => { };

interface IHook {
    tap(pluginName: string, fn: FN): void;
    tapAsync(pluginName: string, fn: FN): void;
}

export class HookMaster {
    constructor(private name: string) { }

    public handle(hook: IHook, { async, context }: { async?: boolean; context?: any; } = {}, enabled: boolean) {
        if (!hook) { return noop; }
        if (!enabled) { return noop; }

        const options = {
            async,
            name: this.name,
        };

        return (((h, c, o) => {

            let handler: FN = noop;

            try {
                if (o.async) {

                    h.tapAsync(o.name, (...args: any[]) => {
                        handler.apply(c, args);
                        return args[args.length - 1]();
                    });

                } else {

                    h.tap(o.name, (...args: any[]) => {
                        handler.apply(c, args);
                    });

                }
            } catch (e) {
                throw new Error(`Unable to set handler on ${o.name}: ${e}.\nPossibly sync vs async hook problem.`);
            }

            return (fn: FN) => {
                handler = fn;
            };

        }))(hook, context, options);

    }

    public sync(hook: IHook, context: any, enabled: boolean) {
        return this.handle(hook, {
            async: false,
            context,
        }, enabled);
    }

    public async(hook: IHook, context: any, enabled: boolean) {
        return this.handle(hook, {
            async: true,
            context,
        }, enabled);
    }
}
