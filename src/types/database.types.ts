export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            leads: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    telegram: string
                    age: string
                    shift_preference: string
                    device: string
                    status: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    telegram: string
                    age: string
                    shift_preference: string
                    device: string
                    status?: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    telegram?: string
                    age?: string
                    shift_preference?: string
                    device?: string
                    status?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
