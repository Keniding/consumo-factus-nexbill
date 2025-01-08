export interface FacturaInput {
    numbering_range_id?: number
    reference_code: string
    observation?: string
    payment_form?: string
    payment_due_date?: string
    payment_method_code?: string
    billing_period?: {
        start_date: string
        start_time?: string
        end_date: string
        end_time?: string
    }
    customer: {
        identification_document_id: string
        identification: string
        dv?: string
        company?: string
        trade_name?: string
        names: string
        address?: string
        email?: string
        phone?: string
        legal_organization_id: string
        tribute_id: string
        municipality_id?: string
    }
    items: Array<{
        code_reference: string
        name: string
        quantity: number
        discount_rate: number
        price: number
        tax_rate: string
        unit_measure_id: number
        standard_code_id: number
        is_excluded: number
        tribute_id: number
        withholding_taxes: Array<{
            code: string
            withholding_tax_rate: string
        }>
    }>
}

export interface Factura {
    id: number;
    number: string;
    api_client_name: string;
    reference_code: string | null;
    identification: string;
    graphic_representation_name: string;
    company: string;
    trade_name: string;
    names: string;
    email: string;
    total: string;
    status: number;
    errors: any[];
    send_email: number;
    has_claim: number;
    is_negotiable_instrument: number;
    payment_form: {
        code: string;
        name: string;
    };
    created_at: string | null;
    credit_notes: any[];
    debit_notes: any[];
}