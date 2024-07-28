'use client'

import { memberShipPlans } from "@/utails";
import CommonCard from "../common-card";
import { Button } from "@/components/ui/button";


function MemberShipPage({profileInfo}) {
    return ( 
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Choose Your Best Plan</h1>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            memberShipPlans.map((plan)=>(
                                <CommonCard
                                icon={
                                    <div className="flex justify-between">
                                        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide stroke-2 lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                                        </div>
                                        <h1 className="text-4xl font-bold">{plan.heading}</h1>
                                    </div>
                                }
                                title={`$ ${plan.price} /yr`}
                                descripation={plan.type}
                                footerContant={
                                    <Button>Get Premium</Button>
                                }
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}

export default MemberShipPage;