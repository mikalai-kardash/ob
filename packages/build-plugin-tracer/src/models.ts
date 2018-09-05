export interface IHookSettings {
    issuer?: boolean;
    buildInfo?: boolean;
    reference?: boolean;
    dependency?: boolean;
    module?: boolean;
    modules?: boolean;
    assets?: boolean;
    loaders?: boolean;
    dependencies?: boolean;
}

export interface ICompilationOptions {
    all?: true;
    buildModule?: true | IHookSettings;
    rebuildModule?: true | IHookSettings;
    failedModule?: true | IHookSettings;
    succeedModule?: true | IHookSettings;
    dependencyReference?: {
        reference?: true | IHookSettings;
        dependency?: true | IHookSettings;
        module?: true | IHookSettings;
    };
    finishModules?: true | IHookSettings;
}

export interface ITraceOptions {
    compilation?: ICompilationOptions;
}

export interface ITraceCompilationOptions {
    verbose?: boolean;
    trace?: ITraceOptions;
}

export interface IModuleDescription {
    buildInfo: {
        assets: { [key: string]: any };
        contextDependencies: Set<string>;
    };
    issuer?: IModuleDescription;
    rawRequest: string;
    dependencies: Array<{
        optional: boolean;
        module: IModuleDescription;
    }>;
    loaders: Array<{
        loader: string;
    }>;
}

