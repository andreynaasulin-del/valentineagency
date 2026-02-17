'use server'

import { createClient } from '@/lib/supabase/server'
import { leadSchema } from "@/lib/validations"
import { z } from "zod"

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

    const { name, telegram, age, shift, device } = validatedFields.data

    // 2. Insert into Supabase
    const supabase = await createClient()

    try {
        const { error } = await supabase
            .from('leads')
            .insert({
                name,
                telegram,
                age,
                shift_preference: shift,
                device,
                status: 'new' // Default status
            })

        if (error) {
            console.error('Supabase Error:', error)
            return { error: 'Ошибка базы данных. Попробуйте позже.', success: false }
        }

        return { error: null, success: true }
    } catch (e) {
        console.error('Unexpected Error:', e)
        return { error: 'Неизвестная ошибка сервера.', success: false }
    }
}
