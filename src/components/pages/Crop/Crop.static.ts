export interface Crop {
    id?: string;
    name: string;
}

export interface CropFormErrorHook {
    formErrors: Crop;
    validateCrop: (crop: string) => boolean;
}
