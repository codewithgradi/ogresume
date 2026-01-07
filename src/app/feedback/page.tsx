'use client'
import Feedback from '@/components/FeedBack'
import { useFormContext } from "@/components/FormProvider";


export default function page() {
    const { formData } = useFormContext(); 
     if (!formData) {
      //alert("No data available !");
      return;
    }

    return (
        <div>
            <Feedback data={formData} />
        </div>
    )
}

