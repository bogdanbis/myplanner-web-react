import type { IPlan } from "@/models/Plan";
import MpLinkButtonWithConfirm from "../ui/buttons/MpLinkButtonWithConfirm";
import type Photo from "@/models/responses/Photo";
import MpFileUpload from "../ui/MpFileUpload";
import api from "@/api";

interface PlanImagesProps {
    plan: IPlan,
    uploadEnabled?: boolean;
    onUpload?: () => void;
    onDeleteImage?: (image: Photo) => void;
    className?: string;
}

export default function PlanImages({
    plan,
    uploadEnabled = false,
    onUpload,
    onDeleteImage,
    className,
}: PlanImagesProps) {

    const imageSrc = (image: Photo) => `${api.params.baseURL}/images/${image.id}`;

    return (
        <div className={className ? className : ''}>
            {plan.images.map((image, index) => (
                <div key={index}>
                    <img src={imageSrc(image)} className="mp-image" alt="" />
                    {uploadEnabled &&
                        <MpLinkButtonWithConfirm onConfirm={() => onDeleteImage!(image)} withIcons>
                            Delete image
                        </MpLinkButtonWithConfirm>
                    }
                </div>
            ))}
            {uploadEnabled && plan.images.length &&
                <MpFileUpload onUpload={onUpload!} accept="image/*">
                    Image
                </MpFileUpload>
            }
        </div>
    )
}
