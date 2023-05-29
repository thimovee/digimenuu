import { ChevronDown, Info, ShoppingCart } from 'lucide-react'
import SignInButton from './SignInButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'
const Navbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <>
            <nav className="bg-[#262626] w-full h-40 flex flex-col text-white">
                <div className="flex justify-between w-3/4 mx-auto mt-12 h-12 mb-2">
                    <span className="text-xl font-bold">LOGO</span>
                    <div className="flex gap-10 text-[#adadad]">
                        <ShoppingCart className="my-auto" />
                        {session ? <div className="flex max-h-[35px] my-auto"><Image className="rounded-full" src={session.user.image!} alt={session.user.name!} width={35} height={35} /><ChevronDown size={20} /></div> : <SignInButton />}
                    </div>
                </div>
                <div className="h-14 w-3/4 mx-auto flex gap-10">
                    <span className="my-auto">Thema&apos;s & Templates<span className="absolute translate-y-[215%] translate-x-[-515%] w-0 h-0 border-x-[7px] border-x-transparent border-b-[14px] border-b-slate-50"></span></span>
                    <span className="my-auto text-[#707070]">Video&apos;s</span>
                    <span className="my-auto text-[#707070]">Foto&apos;s</span>
                    <span className="my-auto text-[#707070]">Audio</span>
                    <span className="my-auto text-[#707070]">3D</span>
                    <span className="my-auto text-slate-50 border-l-2 border-indigo-500 pl-3 flex gap-2">Oneindige Downloads <Info className="text-[#777777] my-auto" size={14} /></span>
                </div>
            </nav>
            <div className="w-full h-12 mx-auto flex text-[#666] text-xs border-b">
                <div className="flex w-3/4 mx-auto">
                    <span className="px-[10px] my-auto">Alle Producten</span>
                    <span className="px-[10px] my-auto">Frietzaken</span>
                    <span className="px-[10px] my-auto">Restaurants</span>
                    <span className="px-[10px] my-auto">Winkels</span>
                    <span className="px-[10px] my-auto">Recreatie</span>
                </div>
            </div>
        </>
    )
}

export default Navbar
