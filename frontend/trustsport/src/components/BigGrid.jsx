import img1 from "../img/dummy/img1.jpg"
import img2 from "../img/dummy/img2.jpg"
import img3 from "../img/dummy/img3.jpg"
import img4 from "../img/dummy/img4.jpg"
import img5 from "../img/dummy/img5.jpg"


export default function BigGrid() {
    return (
        <>
            {/* <!-- hero big grid --> */}
            <div className="bg-white py-6">
            <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                {/* <!-- big grid 1 --> */}
                <div className="flex flex-row flex-wrap">
                {/* <!--Start left cover--> */}
                <div className="flex-shrink max-w-full w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1">
                    <div className="relative hover-img max-h-98 overflow-hidden">
                    <a href="#">
                        <img className="max-w-full w-full mx-auto h-auto" src={img1} alt="Image description"/>
                    </a>
                    <div className="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
                        <a href="#">
                        <h2 className="text-3xl font-bold capitalize text-white mb-3">Amazon Shoppers Are Ditching Designer Belts for This Best-Selling</h2>
                        </a>
                        <p className="text-gray-100 hidden sm:inline-block">This is a wider card with supporting text below as a natural lead-in to additional content. This very helpfull for generate default content..</p>
                        <div className="pt-2">
                        <div className="text-gray-100"><div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>Europe</div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* <!--Start box news--> */}
                <div className="flex-shrink max-w-full w-full lg:w-1/2">
                    <div className="box-one flex flex-row flex-wrap">
                    <article className="flex-shrink max-w-full w-full sm:w-1/2">
                        <div className="relative hover-img max-h-48 overflow-hidden">
                        <a href="#">
                            <img className="max-w-full w-full mx-auto h-auto" src={img2} alt="Image description"/>
                        </a>
                        <div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
                            <a href="#">
                            <h2 className="text-lg font-bold capitalize leading-tight text-white mb-1">News magazines are becoming obsolete, replaced by gadgets</h2>
                            </a>
                            <div className="pt-1">
                            <div className="text-gray-100"><div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>Techno</div>
                            </div>
                        </div>
                        </div>
                    </article>
                    <article className="flex-shrink max-w-full w-full sm:w-1/2">
                        <div className="relative hover-img max-h-48 overflow-hidden">
                        <a href="#">
                            <img className="max-w-full w-full mx-auto h-auto" src={img3} alt="Image description"/>
                        </a>
                        <div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
                            <a href="#">
                            <h2 className="text-lg font-bold capitalize leading-tight text-white mb-1">Minimalist designs are starting to be popular with the next generation</h2>
                            </a>
                            <div className="pt-1">
                            <div className="text-gray-100"><div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>Architecture</div>
                            </div>
                        </div>
                        </div>
                    </article>
                    <article className="flex-shrink max-w-full w-full sm:w-1/2">
                        <div className="relative hover-img max-h-48 overflow-hidden">
                        <a href="#">
                            <img className="max-w-full w-full mx-auto h-auto" src={img4} alt="Image description"/>
                        </a>
                        <div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
                            <a href="#">
                            <h2 className="text-lg font-bold capitalize leading-tight text-white mb-1">Tips for decorating the interior of the living room</h2>
                            </a>
                            <div className="pt-1">
                            <div className="text-gray-100"><div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>Interior</div>
                            </div>
                        </div>
                        </div>
                    </article>
                    <article className="flex-shrink max-w-full w-full sm:w-1/2">
                        <div className="relative hover-img max-h-48 overflow-hidden">
                        <a href="#">
                            <img className="max-w-full w-full mx-auto h-auto" src={img5} alt="Image description"/>
                        </a>
                        <div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
                            <a href="#">
                            <h2 className="text-lg font-bold capitalize leading-tight text-white mb-1">Online taxi users are increasing drastically ahead of the new year</h2>
                            </a>
                            <div className="pt-1">
                            <div className="text-gray-100"><div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>Lifestyle</div>
                            </div>
                        </div>
                        </div>
                    </article>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}