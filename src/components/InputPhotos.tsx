"use client"
import { useRef, useState } from "react";

export type Image = {
    id: string;
    url: string;
}

export type InputPhotosProps = {
    photos: Image[];
    setPhotos: (photos: Image[]) => any;
}

const InputPhotos = ({photos, setPhotos}: InputPhotosProps) => {
    const [imageType, setImageType] = useState("");
    
    const [loadedImage, setLoadedImage] = useState<Image>({id: "", url: ""});

    const [imageLoaded, setImageLoaded] = useState(false);
    const [message, setMessage] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleUpload = async (content: any) => {
        if (loadedImage.id) {
            await removeImage(loadedImage.id);
        }

        if (content) {
            let blobData;

            if (typeof content === 'string') {
                const response = await fetch(content);
                blobData = await response.blob();
            } else if (content instanceof ArrayBuffer) {
                blobData = new Blob([content]);
            }
    
            if (blobData) {
                const formData = new FormData();
                formData.append('photo', blobData);
                formData.append('type', "0");
    
                try {
                    const response = await fetch('http://localhost:3000/gallery/image', {
                        method: 'POST',
                        body: formData,
                    });
    
                    const data = await response.json();

                    if (data.id && data.url) {
                        setLoadedImage(data);
                        setImageLoaded(true);
                    } else {
                        setLoadedImage({ id: "", url: "" });
                        setImageLoaded(false);
                    }
                } catch (error) {
                    console.error('Erro no upload:', error);
                    setLoadedImage({id: "", url: ""});
                }

                
            }
        }
    };

    const removeImage = async (id: string) => {
        try {
            await fetch(`http://localhost:3000/gallery/image/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Erro no upload:', error);
        }
        
    };
    
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const content = e.target?.result || null;
                if (content) {
                    setMessage("Carregando imagem...");
                    setImageLoaded(false);
                    await handleUpload(content);
                    setMessage("");
                }
            };

            reader.readAsArrayBuffer(file);
        }

    };


    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleModalConfirm = async () => {
        if (loadedImage.id !== loadedImage.url && imageType) {
            let pos = 0;

            if (imageType === 'second_image') pos = 1;
            if (imageType === 'third_image') pos = 2;
            if (imageType === 'fourth_image') pos = 3;

            if (photos[pos]) {
                await removeImage(photos[pos].id);
            }

            const addPhoto = (prevPhotos: Image[]) => {
                const updatedPhotos = [...prevPhotos];
                updatedPhotos[pos] = loadedImage;
                return updatedPhotos;
            }
            setPhotos(addPhoto(photos));
            
        }
        
        reset();
        setIsModalOpen(false);
    };

    const handleModalCancel = async () => {
        reset();
        setIsModalOpen(false);

        if (loadedImage.id) {
            await removeImage(loadedImage.id);
        }
    };

    const reset = () => {
        setImageType("");
        setLoadedImage({ id: "", url: "" });
    };


    return (
      <>
        <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 w-ful">
                <div className="bg-orangee-normal aspect-[1/1] w-3/4 rounded-lg overflow-hidden">
                    {
                        photos[0] && photos[0].id !== "" && photos[0].url !== "" && (
                            <picture className="flex items-center justify-center w-full h-full">
                                <img 
                                    className="w-full h-full object-cover"
                                    src={photos[0].url}
                                    alt="Imagem do animal" 
                                />
                            </picture>
                        )
                    }
                </div>

                <div className="flex flex-col gap-2 w-1/4">
                    <div className="bg-orange-400 aspect-[1/1] w-full rounded-lg overflow-hidden">
                        {
                            photos[1] && photos[1].id !== "" && photos[1].url !== "" && (
                                <picture className="flex items-center justify-center w-full h-full">
                                    <img 
                                        className="w-full h-full object-cover"
                                        src={photos[1].url}
                                        alt="Imagem do animal" 
                                    />
                                </picture>
                            )
                        }
                    </div>
                    <div className="bg-orange-300 aspect-[1/1] w-full rounded-lg overflow-hidden">
                        {
                            photos[2] && photos[2].id !== "" && photos[2].url !== "" && (
                                <picture className="flex items-center justify-center w-full h-full">
                                    <img 
                                        className="w-full h-full object-cover"
                                        src={photos[2].url}
                                        alt="Imagem do animal" 
                                    />
                                </picture>
                            )
                        }
                    </div>
                    <div className="bg-orange-200 aspect-[1/1] w-full rounded-lg overflow-hidden">
                        {
                            photos[3] && photos[3].id !== "" && photos[3].url !== "" && (
                                <picture className="flex items-center justify-center w-full h-full">
                                    <img 
                                        className="w-full h-full object-cover"
                                        src={photos[3].url}
                                        alt="Imagem do animal" 
                                    />
                                </picture>
                            )
                        }
                    </div>
                </div>
            </div>


            <button
                type="button" 
                className={`
                    inline-flex w-full px-8 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal
                    hover:bg-darkblue-hover active:shadow-btn-disable active:bg-darkblue-light_active text-white active:text-black
                `}
                onClick={() => setIsModalOpen(true)}
            >
                <span className="text-md font-semibold text-white shadow-sm">
                    Adicionar imagem
                </span>
            </button>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md w-1/2 lg:w-1/3 flex flex-col items-center gap-4">
                    <h2 className="text-lg font-semibold w-full">Adicionar foto do animal</h2>

                    <div className="bg-darkblue-normal aspect-[1/1] w-2/3 rounded-lg overflow-hidden flex justify-center items-center">
                        {imageLoaded && loadedImage.id && loadedImage.url && (
                            <picture className="flex items-center justify-center w-full h-full">
                                <img 
                                    className="w-full h-full object-cover"
                                    src={loadedImage.url} 
                                    alt="" 
                                />
                            </picture>
                        )}
                        {!imageLoaded && (
                            <p className="text-white">{message}</p>
                        )}
                    </div>

                    <div className="flex gap-2 w-full justify-between">
                        <select
                            className={`
                                p-2 border border-gray-300 rounded-sm flex-1
                                h-full
                            `}
                            defaultValue={imageType}
                            onChange={(e) => setImageType(e.target.value)}
                        >
                            <option key="" value="" disabled>
                                Tipo
                            </option>
                            <option value="main_image">Imagem principal</option>
                            <option value="second_image">Segunda imagem</option>
                            <option value="third_image">Terceira imagem</option>
                            <option value="fourth_image">Quarta imagem</option>
                        </select>
                        <div className="flex flex-col items-center flex-1 ">
                            <button
                                type="button"
                                className="bg-orangee-normal hover:bg-orange-400 text-white font-bold py-2 px-4 rounded w-full"
                                onClick={handleButtonClick}
                            >
                                Escolher Imagem
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 w-full">
                        <button 
                            type="button"
                            className="text-gray-600 font-semibold" onClick={handleModalCancel}>
                            Cancelar
                        </button>
                        <button 
                            type="button"
                            className="text-darkblue-normal font-semibold" onClick={handleModalConfirm}>
                            Confirmar
                        </button>
                    </div>
                </div> 
            </div>
        )}
      </>
    );
};

export default InputPhotos;

