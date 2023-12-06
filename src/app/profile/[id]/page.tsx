import { BsPencil } from "react-icons/bs";

type User = {
    id: string;
    name: string;
    username: string;
    role: number;
    description: string;
    email: string;
    date_birth?: string;
    created_at: string;
    city: {
        name: string;
        state: {
            name: string;
            abbreviation: string;
        }
    }
    profile_picture: {
        id: string;
        url: string;
    }
};

export default async function Profile({params}: any){

    const user: User = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/user/${params.id}`, {
        cache: "no-store",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (!response.ok) {
            // throw new Error("Erro na solicitação");
        }
        return response.json();
    });

    function formatDate(input: string) {
        const date = new Date(input);
      
        const months = [
          'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
          'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
      
        const formattedDate =
          date.getDate() +
          ' de ' +
          months[date.getMonth()] +
          ' de ' +
          date.getFullYear();
      
        return formattedDate;
      }

    function formatDateMonthsAndYear(input: string) {
        const date = new Date(input);
        
        const months = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
        
        const formattedDate =
            months[date.getMonth()] +
            ' de ' +
            date.getFullYear();
        
        return formattedDate;
    }

    function formatWord(word: string) {
        const formatted_word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return formatted_word;
    }

    return (
        <div className="relative flex flex-col justify-center items-center h-min w-full pt-20 lg:pt-24 -z-50">
            <div className="relative flex justify-center bg-darkblue-normal h-[120px] md:h-[150px] w-full">
                <div className="absolute flex justify-center items-end bottom-[-25%] w-[350px]">
                    <picture>
                        <img src="../../../doguinhos 2.svg" alt="" />
                    </picture>
                </div>
            </div>
            <div className="w-[80%]">
                <div
                    className={`
                        absolute top-[27%] md:top-[28%] lg:top-[26%] xl:top-[24%] xl3:top-[22%] flex flex-col justify-center
                        w-[11%] md:w-[13%] lg:w-[11%] xl:w-[9%] xl3:w-[7%] aspect-[1/1]
                        bg-white border border-black rounded-full
                        overflow-hidden
                    `}
                >
                    {
                        user?.profile_picture.url && (
                            <picture className="flex items-center justify-center w-full h-full">
                                <img 
                                    className="w-full h-full object-cover"
                                    src={user.profile_picture.url} 
                                    alt="Imagem do usuário" 
                                />
                            </picture>
                        )
                    }
                    
                </div>
            </div>
            <div className="bg-beige-normal w-full h-min flex justify-center">
                <div className="relative flex flex-col justify-center h-full w-[80%] my-[10%] md:my-[7%] xl:my-[5%] xl3:my-[4%]">
                    <h1 className=" text-lg md:text-xl lg:text-2xl font-semibold">{user.name}</h1>
                    <p className=" text-sm md:text-md lg:text-lg font-semibold text-gray-600">@{user.username}</p>

                    <p className="my-4 text-sm md:text-md lg:text-lg font-normal">
                        {user.description}  
                    </p>

                    <div className="flex flex-col gap-1 text-gray-600 text-sm md:text-md lg:text-lg font-normal">
                        <p>{formatWord(user.city.name)}, {user.city.state.abbreviation}</p>
                        {user.date_birth && (<p>Nascido(a) em {formatDate(user.date_birth)}</p>)}                        
                        <p>Ingressou em {formatDateMonthsAndYear(user.created_at)}</p>
                        {/* <p>Bichos que colocou para adoção: 3</p>
                        <p>Bichos que solicitou apadrinhamento: 2</p> */}

                    </div>

                    <button
                        type="button"
                        className={`
                            inline-flex px-2 py-1 lg:px-4 lg:py-2 bg-orangee-normal rounded-md justify-center items-center shadow-btn border border-black 
                            w-min h-min mt-3 gap-2 absolute -top-10 right-0
                        `}
                    >
                        <BsPencil className="text-white h-3 font-semibold md:h-6" />
                        <span className={`
                            text-sm lg:text-md font-semibold text-white shadow-sm w-max
                        `}>
                            Editar perfil
                        </span>
                    </button>
                </div>
            </div>


        </div>
    );
}