import Header from '@/components/Header';
import ListCardAnimal from '@/components/ListCardAnimal';

export default async function Home() {

    async function getPosts(url: string) {
        "use server";
	
		const response = await fetch(url, {
            cache: "no-store",
        })
	
        if (!response.ok) return null;

		const responseData = await response.json();

        console.log()
        
        return {
            posts: responseData.data,
            paginationPresenter: responseData.paginationPresenter
        }
    }
   
    return (
        <>
            <Header />
            <ListCardAnimal getPosts={getPosts}/>
        </>
    )
}


