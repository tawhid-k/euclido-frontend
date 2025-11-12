'use client'

import { MoveRightIcon } from 'lucide-react'
import { Button } from '@heroui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Logo } from '../global/logo'

export default function AuthSideContent() {
    const router = useRouter()
    return (
        <div className="flex flex-col gap-16">
            <Logo />
            <div className="flex flex-col gap-6">
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: -30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.7
                    }}
                    className="font-semibold text-5xl text-primary leading-tight"
                >
                    The smartest gateway to global higher studies opportunities
                </motion.h1>
                <motion.p
                    initial={{
                        opacity: 0,
                        y: -30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.3
                    }}
                    className="text-primary/80"
                >
                    Embark on a journey of growth and discovery with programs
                    designed to equip you with the skills, knowledge, and global
                    perspective needed to thrive. Unlock opportunities that
                    connect you to careers worldwide and prepare you to make a
                    meaningful impact in your field
                </motion.p>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.7,
                    delay: 0.5
                }}
            >
                <Button
                    color="secondary"
                    radius="full"
                    className="font-medium max-w-fit"
                    onPress={() => router.push('/')}
                    endContent={<MoveRightIcon strokeWidth={1} size={20} />}
                >
                    Find Opportunities Now
                </Button>
            </motion.div>
        </div>
    )
}
