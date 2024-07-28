'use client'

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import CandidateList from "../candidate-list";


function JobApplicants({
    showDrawer,
    setShowDrawer,
    showCandidateDetails,
    setShowCandidateDetails,
    candidateDetails,
    setCandidateDetails,
    jobs,
    fetchAllApplication}) {

        //console.log(fetchAllApplication)
    return ( 
        <div>
            <Drawer open={showDrawer} onOpenChange={setShowDrawer} >
                <DrawerContent className="max-h-[50vh]" >
                    <ScrollArea className="h-auto overflow-y-auto">
                        <CandidateList
                        showCandidateDetails={showCandidateDetails}
                        setShowCandidateDetails={setShowCandidateDetails}
                        candidateDetails={candidateDetails}
                        setCandidateDetails={setCandidateDetails}
                        fetchAllApplication={fetchAllApplication}
                        />
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        </div>
     );
}

export default JobApplicants;