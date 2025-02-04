import { CiSearch } from "react-icons/ci"; 
interface SearchProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Type for the setSearchQuery function
}
const Search = ({ setSearchQuery }: SearchProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query in the parent component
  };
  return (
    <div className="h-[96px] w-full flex items-center px-4">
     <div className="flex items-center bg-[#5436397A] w-full px-3 py-2 rounded-full space-x-1">
     <CiSearch className="text-xl text-white" />
       <input type="text" name="" id="" className="bg-transparent outline-none placeholder:text-[#FFFFFF99] text-xs font-light flex-1 text-white" placeholder="Search conversation" onChange={handleSearchChange} />
     </div>
    </div>
  )
}

export default Search