import { Compiler } from 'webpack';

export class TracePlugin {
    public Apply(compiler: Compiler): void {
        compiler.hooks.done.tap('TracePlugin', () => {
            // tslint:disable-next-line:no-console
            console.log('Done!');
        });
    }
}
