export class RegExpUtils {
    static escapeRegExp(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    static exactMatchRegExp(value: string): RegExp {
        return new RegExp(`^\\s*${this.escapeRegExp(value)}\\s*$`);
    }

    static caseInsensitiveRegExp(value: string): RegExp {
        return new RegExp(this.escapeRegExp(value), 'i');
    }

    static productNameToLooseRegExp(productName: string): RegExp {
        const normalized = productName
            .replace(/\u00a0/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');
        const parts = normalized
            .split(' ')
            .filter(Boolean)
            .map((part) => RegExpUtils.escapeRegExp(part));
        return new RegExp(parts.join('\\s+'), 'i');
    }
}
