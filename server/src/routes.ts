import { prisma } from "./lib/prisma"
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import dayjs from "dayjs"

export async function appRoutes(app: FastifyInstance) {

    app.post('/habits', async (request) => {

        const createHabitsBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })

        const today = dayjs().startOf('day').toDate()

        const { title, weekDays } = createHabitsBody.parse(request.body)

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })

    })
}

function daysJs() {
    throw new Error("Function not implemented.")
}

