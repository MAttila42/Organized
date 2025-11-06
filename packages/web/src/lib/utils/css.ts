import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type { WithElementRef, WithoutChild, WithoutChildren, WithoutChildrenOrChild } from 'bits-ui'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
