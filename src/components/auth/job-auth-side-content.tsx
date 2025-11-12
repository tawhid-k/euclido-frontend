'use client'

import { MoveRightIcon } from 'lucide-react'
import { Button } from '@heroui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Logo } from '../global/logo'

export default function JobAuthSideContent() {
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
                    className="font-semibold text-4xl text-primary leading-tight"
                >
                    Sign up to access our global talent pool and simplify your
                    recruitment process with Euclido
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
                    With advanced search filters, AI-powered recommendations,
                    and seamless communication features, you can connect with
                    top talent that aligns with your hiring needs. Whether
                    you&apos;re looking for experienced professionals or fresh
                    talent, our platform ensures a hassle-free recruitment
                    experience. Join today and take the stress out of
                    hiring—find the perfect candidates with ease!
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
            ></motion.div>
        </div>
    )
}
