export declare class BudgetItem {
    budget_name: string;
    amount: number;
    generate_by: string;
    userContributions: Record<string, number>;
    createdAt: Date;
    constructor({ budget_name, amount, generate_by, userContributions, }: {
        budget_name: string;
        amount: number;
        generate_by: string;
        userContributions: Record<string, number>;
    });
}
