export const TEST_DATA = {
    AUTH: {
        SUCCESS_MESSAGES: {
            ACCOUNT_CREATED: 'Account Created!',
        },
        ERROR_MESSAGES: {
            DUPLICATE_EMAIL: 'Email Address already exist!',
            INVALID_CREDENTIALS: 'Your email or password is incorrect!',
        },
    },
    ORDERS: {
        SUCCESS_MESSAGES: {
            PLACED: 'ORDER PLACED',
        },
    },
    FILES: {
        CONTACT_FORM_ATTACHMENT: 'test-data/test-file.txt',
    },
    SEARCH: {
        INVALID_TERM: 'XYZ123NOTFOUND',
        VALID_TERM_1: 'T-Shirt',
        VALID_TERM_2: 'Jeans',
    },
    CATEGORIES: {
        MEN_JEANS: {
            category: 'Men',
            expectedTitle: 'Men - Jeans Products',
            subcategory: 'Jeans',
        },
        WOMEN_DRESS: {
            category: 'Women',
            expectedTitle: 'Women - Dress Products',
            subcategory: 'Dress',
        },
    },
    BRANDS: {
        H_AND_M: {
            expectedTitle: 'Brand - H&M Products',
            name: 'H&M',
        },
        POLO: {
            expectedTitle: 'Brand - Polo Products',
            name: 'Polo',
        },
    },
} as const;
