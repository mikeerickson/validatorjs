declare module "validatorjs" {

    type AttributeFormatter = (attribute: any) => any
    type ParsedRule = {
        attribute: Array<{ name: string, value: any }>
    }

    type PassesFn = (pass?: boolean, reason?: string) => void
    type ValidatorFn = (value: any, requirement?: any, attribute?: string) => boolean
    type ValidatorAsyncFn = (value: any, requirement?: any, attribute?: string, passes?: PassesFn) => boolean

    class Rule {
        public validate (inputValue: any, ruleValue: any, attribute: string, callback: Function): boolean | void
        public getParameters (): Array<any>
        public getSize (): number
        public response (passes?: boolean, message?: string): void
        public setValidator (validator: Validator): void
    }

    class Errors {
        public errors: any
        public add (attribute: string, message: string): void
        public get (attribut: string): Array<string>
        public first (attribute: string): string | boolean
        public all (): any
        public has (attribute: string): boolean
    }

    class Validator {

        public lang: string
        public input: any
        public messages: any
        public errors: Errors
        public errorCount: number
        public hasAsync: boolean
        public rules: any
        public numericRules: Array<string>
        public attributeFormatter: AttributeFormatter

        constructor (data: any, rules: any , customMessages?: any)

        public static setMessages (lang: string, messages: any): any
        public static getMessages (lang: string): any
        public static useLang (lang: string): void
        public static getDefaultLang (): string
        public static setAttributeFormatter (func: AttributeFormatter): void
        public static stopOnError (attributes: boolean | Array<string>): void
        public static register (name: string, fn: ValidatorFn, message?: string): void
        public static registerAsync (name: string, fn: ValidatorAsyncFn, message?: string): void

        public check (): boolean
        public checkAsync (passes?: Function, fails?: Function): void
        public setAttributeNames (attributes: any): void
        public setAttributeFormatter (func: AttributeFormatter): void
        public getRule (name: string): Rule
        public stopOnError (passes?: Function): boolean | void
        public passes (passes?: Function): boolean | void
        public fails (fails?: Function): boolean | void

    }

    export = Validator

}
