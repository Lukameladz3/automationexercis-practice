/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from '@playwright/test';

export function step(stepName: string): any {
    return function (target: any, context?: any, descriptor?: PropertyDescriptor) {
        if (
            typeof context === 'object' &&
            context &&
            'kind' in context &&
            context.kind === 'method'
        ) {
            const originalMethod = target;
            return async function (this: any, ...args: any[]) {
                return await test.step(stepName, async () => {
                    return await originalMethod.apply(this, args);
                });
            };
        }

        if (descriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = async function (...args: any[]) {
                return await test.step(stepName, async () => {
                    return await originalMethod.apply(this, args);
                });
            };
            return descriptor;
        }

        throw new Error(
            `@step decorator used with unsupported signature. Args: ${arguments.length}`,
        );
    };
}
