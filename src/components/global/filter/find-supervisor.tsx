'use client'

import { arrow } from '../../degree-list/icons'
import { useState } from 'react'
import Modal, {
    BasicProgramInfo
} from '../../degree-list/supervisor-modal'
import { ProgramT } from '@/@/lib/types/program-type'
import { MoveRight, MoveRightIcon } from 'lucide-react'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure
} from "@heroui/react"

export function FindSupervisors({ program }: { program: BasicProgramInfo }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <div className="max-w-fit">
            <Button
                color="secondary"
                radius="full"
                endContent={<MoveRightIcon strokeWidth={1} size={20} />}
                onPress={onOpen}
            >
                Find Supervisor
            </Button>
            <Drawer
                size="xl"
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    <Modal program={program} />
                </DrawerContent>
            </Drawer>
        </div>
    )
}
