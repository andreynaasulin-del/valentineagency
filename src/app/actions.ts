'use server'

import { leadSchema } from "@/lib/validations"

export type FormState = {
    error: string | null
    success: boolean
}

export async function submitLead(formData: FormData): Promise<FormState> {
    const rawData = {
        name: formData.get('name'),
        telegram: formData.get('telegram'),
        age: formData.get('age'),
        shift: formData.get('shift'),
        device: formData.get('device'),
    }

    // 1. Validate input data
    const validatedFields = leadSchema.safeParse(rawData)

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors
        const firstError =
            fieldErrors.name?.[0] ||
            fieldErrors.telegram?.[0] ||
            fieldErrors.age?.[0] ||
            fieldErrors.shift?.[0] ||
            fieldErrors.device?.[0] ||
            'Проверьте правильность заполнения полей'
        return {
            error: firstError,
            success: false
        }
    }

    // Form validation passed - return success
    // TODO: Integrate Supabase when environment variables are configured
    console.log('Lead submitted:', rawData)
    return { error: null, success: true }
}
