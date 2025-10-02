import ListComponent from "./ListComponent"

type BlockBuilderProps = {
    title?: string,
    businessName: string,
    city: String,
    country: String,
    start: string,
    end:string,
    items : string[]
}

export default function BlockBuilder({
    title,
    businessName,
    city,
    country,
    start,
    end,
    items
}: BlockBuilderProps) {
    return (
        <div>
            {title && <h5 className="font-bold py-3 ">{title}</h5>}
            <div className="flex items-center justify-between my-2 font-semibold">
                <p>{businessName}, {city}, {country}</p>
                <p>{start} - {end}</p>
            </div>
            <div>
                <ListComponent items={items}/>
            </div>
        </div>
    )
}