import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const user = await db.user.findUnique({ where: { id: userId } })
    return (
        <div className="w-3/4 mx-auto my-10 flex gap-20">
            <div>
                <h1 className="text-3xl font-bold">Profiel</h1>
                <div className="flex flex-col gap-10 mt-10 font-semibold">
                    <div>Gegevens</div>
                    <div>Bestellingen</div>
                    <div>Downloads</div>
                </div>
            </div>
            <div className="flex gap-20">
                <Image className="rounded-full max-w-[100px] max-h-[100px] object-contain" src={user!.image!} alt={user!.name!} width={100} height={100} />
                <div className="flex gap-20">
                    <div className="flex flex-col">
                        <label className='text-slate-600'>Naam</label>
                        <input className="border-2 border-slate-300 rounded-md max-w-fit max-h-[40px] px-4 py-2" placeholder={user!.name} />
                    </div>
                    <div className="flex flex-col">
                        <label className='text-slate-600'>Email</label>
                        <input className="border-2 border-slate-300 rounded-md max-w-fit max-h-[40px] px-4 py-2" placeholder={user!.email} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page