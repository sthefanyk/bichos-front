import CardAnimal from '@/components/CardAnimal';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';


export default async function Home() {

    const posts = await fetch("http://localhost:3000/post/adopt")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Erro na solicitação");
			}
			return response.json();
		})
		.then((responseData) => {
            return responseData.data;
		})

    return (
        <>
            {/* Navbar */}
            <Navbar page='home'/>
            <Header />
            <div className='lg:px-32 bg-beige-normal space-y-12 lg:space-y-16'>
                <div className='flex justify-center lg:space-x-16 border-b lg:border-b-2 border-darktext-normal'>
                    <button className='border-b-2 lg:border-b-4 border-black py-4 px-6'>
                        <span className='font-jakarta text-xl lg:text-2xl font-semibold uppercase '>adotar</span>
                    </button>
                    <button className='border-b-2 lg:border-b-4 py-6 px-6'>
                        <span className='font-jakarta text-xl lg:text-2xl font-semibold uppercase '>apadrinhar</span>
                    </button>
                </div>
                <div className='flex flex-row justify-between'>
                    <a href="" className='inline-flex max-w-max px-8 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal'>
                        <span className='text-lg lg:text-xl font-semibold text-lighttext-normal shadow-sm'>Colocar para adoção</span>
                    </a>
                    <a href="" className='inline-flex max-w-max px-8 py-3 h-12 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-darktext-normal'>
                        <span className='text-lg lg:text-xl font-semibold text-lighttext-normal shadow-sm'>Filtrar</span>
                    </a>
                </div>
                <h2 className='font-bold text-2xl lg:text-4xl'>Bichos para adotar:</h2>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6 justify-between h-auto'>
                    {
                        posts.map((post: any) => (
                            <CardAnimal key={post.id} name={post.animal.name}/>)
                        )
                    }
                </div>
                <div className='h-40'></div>
                <div className='h-40'></div>
                <div className='h-40'></div>
                <div className='h-40'></div>
                <div className='h-40'></div>
                <div className='h-40'></div>
                <div className='h-40'></div>
                <div className='h-40'></div>
            </div>
            
        </>
    )
}


