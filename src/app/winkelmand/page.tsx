import RemoveFromCart from '@/components/RemoveFromCart'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const cartItems = await db.shoppingCart.findMany({ where: { userId, }, include: { products: true, }, })
    const totalPrice = cartItems.reduce((acc, item) => { return acc + item.products.reduce((acc, product) => { return acc + product.price }, 0) }, 0)
    const cartLength = cartItems.reduce((acc, item) => { return acc + item.products.length }, 0)
    const removeFromCart = async (productId: string) => {
        "use server";
        if (userId) {
            await db.shoppingCart.update({
                where: {
                    userId: userId,
                },
                data: {
                    products: {
                        disconnect: {
                            id: productId,
                        },
                    },
                },
            });
            revalidatePath("/");
        }
    };

    return (
        <div className="flex w-3/4 mx-auto mt-20 gap-16 pb-20">
            {cartItems.map((item: any) => (
                <div className="w-[800px] border border-slate-400 px-6 pb-6" key={item.id}>
                    {item.products.map((product: any) => (
                        <div className="flex my-6 border border-slate-200 rounded-md" key={product.id}>
                            <Image className=" rounded-l-md max-w-[150px] max-h-[150px] object-cover min-w-[150px] min-h-[150px] rounded-sm" src={product.image} alt={product.name} width={150} height={150} />
                            <div className="flex justify-between w-full p-4">
                                <div className="flex flex-col justify-between">
                                    <h1 className="font-medium">{product.name}</h1>
                                    <div className="flex gap-2">
                                        <span className="border border-slate-300 w-10 h-10 rounded-sm" />
                                        <span className="border border-slate-300 w-10 h-10 rounded-sm" />
                                        <span className="border border-slate-300 w-10 h-10 rounded-sm" />
                                        <span className="border border-slate-300 w-10 h-10 rounded-sm" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between text-right">
                                    <h1 className="font-semibold">€{product.price}</h1>
                                    <RemoveFromCart removeFromCart={removeFromCart} productId={product.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div>
                {cartLength === 0 ? (
                    <h1>Je winkelmand is leeg</h1>
                ) : (
                    <div className="border border-slate-400 p-4 flex flex-col w-[400px]">
                        <h1 className="text-lg font-semibold mb-4">Overzicht</h1>
                        <div className="flex justify-between">
                            <h2>Artikelen <span className="font-medium text-slate-400 text-sm">{`(${cartLength})`}</span></h2>
                            <h2 className="font-bold">{`€${totalPrice}`}</h2>
                        </div>
                        <div className="w-full h-[1px] bg-slate-400 mt-8" />
                        <button className="w-full bg-blue-500 font-medium text-white rounded-md py-2 my-4">Verder naar betalen</button>
                        <div className="flex max-w-fit gap-4 mx-auto">
                            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><defs><path id="ideal_svg__a" d="M0 .016h23.93v21.091H0z"></path></defs><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><g transform="translate(0 1.563)"><mask id="ideal_svg__b" fill="#fff"></mask><path fill="#FFF" d="M0 1.58v17.964c0 .86.704 1.564 1.564 1.564h10.733c8.115 0 11.633-4.543 11.633-10.57C23.93 4.542 20.412.016 12.297.016H1.564C.704.016 0 .719 0 1.579" mask="url(#ideal_svg__b)"></path></g><path fill="#C06" d="M7.184 5.987v13.275h5.778c5.245 0 7.52-2.963 7.52-7.154 0-4.01-2.275-7.121-7.52-7.121H8.185c-.555 0-1 .453-1 1"></path><path fill="#000" d="M2.963 3.517c-.555 0-1 .446-1 1v15.221a.997.997 0 001 1.001h9.334c6.238 0 9.678-3.064 9.678-8.63 0-7.474-6.066-8.592-9.678-8.592H2.963zm9.334 17.722H2.963a1.501 1.501 0 01-1.501-1.5V4.517a1.5 1.5 0 011.5-1.501h9.335c8.857 0 10.179 5.699 10.179 9.091 0 5.887-3.62 9.131-10.179 9.131z"></path><path fill="#FFF" d="M9.17 12.906a.98.98 0 00.297-.047.582.582 0 00.25-.164.91.91 0 00.18-.297 1.24 1.24 0 00.07-.446 1.83 1.83 0 00-.046-.43.855.855 0 00-.157-.328.705.705 0 00-.281-.211 1.15 1.15 0 00-.43-.07h-.5v2h.617v-.007zm.047-2.588c.203 0 .39.031.57.094.18.063.329.164.462.29a1.6 1.6 0 01.305.484c.07.195.11.422.11.688 0 .234-.032.446-.087.641a1.497 1.497 0 01-.266.508c-.117.14-.265.25-.445.336-.18.079-.391.125-.633.125H7.864V10.31h1.353v.008zm4.268 0v.587h-1.673v.68h1.54v.539h-1.54v.774h1.712v.586h-2.407V10.31h2.368zm2.432 1.947l-.4-1.165h-.007l-.414 1.165h.82zm-.04-1.947l1.189 3.174h-.727l-.243-.703h-1.188l-.25.703h-.704l1.196-3.174h.727zm2.322 0v2.588h1.548v.586h-2.243v-3.174z"></path><path fill="#000" d="M4.573 10.443a1.462 1.462 0 110 2.924 1.462 1.462 0 010-2.924m1.103 8.819a2.21 2.21 0 01-2.213-2.213v-1.727a1.11 1.11 0 112.22 0v3.94h-.007z"></path></g></svg>
                            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" focusable="false" aria-hidden="true"><g fill="none" fill-rule="evenodd"><path fill="#000" d="M20.555 18.306v.068h.057a.055.055 0 00.031-.008.03.03 0 00.012-.026c0-.012-.004-.02-.012-.026a.055.055 0 00-.031-.008h-.057zm.04-.03c.02 0 .035.004.047.013.01.01.016.022.016.038a.045.045 0 01-.013.033.065.065 0 01-.038.016l.052.06h-.04l-.049-.06h-.015v.06h-.034v-.16h.073zm-.01.216a.132.132 0 00.122-.082.138.138 0 00.01-.053.136.136 0 00-.08-.124.136.136 0 00-.104 0 .133.133 0 00-.082.124.136.136 0 00.08.124.13.13 0 00.053.01zm0-.309a.176.176 0 01.16.106.175.175 0 01-.093.227.167.167 0 01-.068.014.17.17 0 01-.124-.051.174.174 0 010-.245.17.17 0 01.124-.05zM4.53 17.564c0-.306.198-.558.522-.558.31 0 .518.24.518.558 0 .318-.208.558-.518.558-.324 0-.522-.251-.522-.558zm1.393 0v-.872H5.55v.212a.65.65 0 00-.544-.255c-.482 0-.86.383-.86.915 0 .533.378.916.86.916a.65.65 0 00.544-.255v.21h.374v-.87zm12.643 0c0-.306.198-.558.522-.558.31 0 .518.24.518.558 0 .318-.209.558-.518.558-.324 0-.522-.251-.522-.558zm1.393 0v-1.572h-.374v.912a.649.649 0 00-.544-.255c-.482 0-.86.383-.86.915 0 .533.378.916.86.916a.65.65 0 00.544-.255v.21h.374v-.87zm-9.392-.576c.241 0 .396.153.436.423h-.893c.04-.252.19-.423.457-.423zm.007-.34c-.504 0-.857.373-.857.916 0 .554.368.916.883.916.258 0 .496-.066.705-.245l-.183-.28a.813.813 0 01-.501.182c-.241 0-.46-.113-.515-.427h1.278a1.82 1.82 0 00.007-.146c-.003-.543-.334-.915-.817-.915zm4.518.916c0-.306.198-.558.522-.558.31 0 .518.24.518.558 0 .318-.208.558-.518.558-.324 0-.522-.251-.522-.558zm1.393 0v-.872h-.374v.212a.649.649 0 00-.544-.255c-.482 0-.86.383-.86.915 0 .533.378.916.86.916a.65.65 0 00.544-.255v.21h.374v-.87zm-3.506 0c0 .529.364.916.918.916a.891.891 0 00.619-.208l-.18-.307a.75.75 0 01-.45.157c-.299-.004-.518-.222-.518-.558 0-.335.22-.554.518-.558a.75.75 0 01.45.157l.18-.306a.894.894 0 00-.62-.208c-.553 0-.917.386-.917.915zm4.824-.915a.506.506 0 00-.454.255v-.212h-.37v1.744h.374v-.978c0-.288.122-.448.367-.448a.6.6 0 01.234.043l.115-.357a.792.792 0 00-.266-.047zm-10.03.182c-.18-.12-.428-.182-.701-.182-.436 0-.717.211-.717.558 0 .284.209.46.594.514l.177.026c.205.029.302.083.302.182 0 .135-.137.212-.392.212a.909.909 0 01-.573-.183l-.176.295c.205.154.464.227.745.227.497 0 .785-.237.785-.57 0-.306-.227-.466-.602-.52l-.176-.027c-.162-.021-.292-.054-.292-.17 0-.128.123-.205.328-.205.22 0 .432.084.537.15l.161-.307zm4.828-.182a.506.506 0 00-.454.255v-.212h-.37v1.744h.374v-.978c0-.288.123-.448.367-.448.076 0 .155.01.234.043l.116-.357a.796.796 0 00-.267-.047zm-3.193.043h-.612v-.529h-.378v.53h-.35v.346h.35v.795c0 .405.155.646.597.646.162 0 .35-.051.468-.135l-.107-.325a.684.684 0 01-.332.098c-.187 0-.248-.116-.248-.291v-.788h.612v-.347zm-5.595 1.744v-1.094c0-.412-.258-.69-.676-.693a.664.664 0 00-.605.31.63.63 0 00-.569-.31.567.567 0 00-.504.258v-.215h-.374v1.744h.378v-.967c0-.303.166-.463.421-.463.248 0 .375.164.375.46v.97h.377v-.967c0-.303.173-.463.422-.463.255 0 .378.164.378.46v.97h.377z"></path><path fill="#E15D29" d="M7.65 13.73h5.67V3.404H7.65z"></path><path fill="#D2232C" d="M8.01 8.567c0-2.095.968-3.96 2.475-5.163A6.399 6.399 0 006.48 2C2.901 2 0 4.94 0 8.567c0 3.627 2.901 6.567 6.48 6.567a6.399 6.399 0 004.005-1.404A6.588 6.588 0 018.01 8.567"></path><path fill="#EC972D" d="M20.769 12.636v-.255h-.066l-.076.176-.075-.176h-.066v.255h.046v-.192l.071.166h.048l.071-.167v.193h.047zm-.416 0v-.211h.084v-.043h-.215v.043h.084v.211h.047zm.618-4.07c0 3.628-2.901 6.568-6.48 6.568a6.397 6.397 0 01-4.005-1.405 6.587 6.587 0 002.475-5.162c0-2.095-.968-3.96-2.475-5.163A6.399 6.399 0 0114.49 2c3.58 0 6.48 2.94 6.48 6.567z"></path></g></svg>
                            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" focusable="false" aria-hidden="true"><path fill="#1a1f71" d="M28 21.709a1.037 1.037 0 01-1.041 1.041H1.041A1.037 1.037 0 010 21.709V6.173a1.037 1.037 0 011.041-1.042h25.918A1.037 1.037 0 0128 6.173z"></path><path fill="#fff" d="M10.645 10.261L7.521 17.7H5.477l-1.543-5.935a.848.848 0 00-.463-.656 7.794 7.794 0 00-1.89-.617l.039-.231H4.9a.873.873 0 01.887.771l.81 4.32L8.6 10.3h2.044zm7.983 5.013c0-1.966-2.7-2.082-2.7-2.931 0-.27.27-.54.81-.617a3.363 3.363 0 011.89.347l.347-1.581a5.4 5.4 0 00-1.812-.347c-1.89 0-3.24 1-3.24 2.468 0 1.08.964 1.659 1.7 2.006s1 .578 1 .925c0 .5-.579.733-1.157.733a4.288 4.288 0 01-1.967-.463l-.347 1.62a5.941 5.941 0 002.121.386c2 0 3.317-1 3.355-2.546m5.014 2.43h1.774l-1.543-7.443h-1.658a.852.852 0 00-.81.54l-2.893 6.9h2.006l.386-1.118h2.468zm-2.16-2.622l1-2.777.578 2.777zm-8.1-4.821L11.8 17.7H9.873l1.582-7.443z"></path></svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page