import "../styles/categories.css"

const categories=[
"All",
"Music",
"Gaming",
"News",
"Live",
"React JS",
"JavaScript",
"Movies",
"Cricket",
"Coding",
"Podcasts",
"AI",
"Web Development",
"Computer Science"
]

function CategoryFilter({ selectedCategory, setSelectedCategory }) {

return(
<div className="categories">

{categories.map(cat=>(
<button 
key={cat} 
className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
onClick={()=>setSelectedCategory(cat === "All" ? "" : cat.toLowerCase())}
>
{cat}
</button>
))}

</div>
)
}

export default CategoryFilter