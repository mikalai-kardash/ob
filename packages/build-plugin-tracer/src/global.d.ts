declare module 'columnify' {
    function columnify(data: { [key: string]: any } | any[], options?: columnify.GlobalOptions): string;

    namespace columnify {
        export interface Options {
            align?: string;
            minWidth?: number;
            maxWidth?: number;
            paddingChr?: string;
            preserveNewLines?: boolean;
            truncateMarker?: string;
            showHeaders?: boolean;
            dataTransform?: (data: string) => string;
            headingTransform?: (data: string) => string;
        }

        interface GlobalOptions extends Options {
            columns?: string[];
            columnSplitter?: string;
            config?: {
                [columnName: string]: Options;
            }
        }
    }

    export default columnify;
}
