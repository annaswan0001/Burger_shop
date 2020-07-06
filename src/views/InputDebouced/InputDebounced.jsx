import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {inputSetValueSaga, inputSetValueSaga2} from '../../store/actions/inputDebouncedAction'

function InputDebounced(props) {

    const [value, setValue] = useState("")
    const [valueDeb, setValueDeb] = useState("")

    useEffect(() => {
        if(value){
            props.inputSetValueSaga(value)
        }
        
    }, [value])

    
    useEffect(() => {
        if(valueDeb){
            props.inputSetValueSaga2(valueDeb)
        }
        
    }, [valueDeb])

    const setInputValue =(e) =>{
        setValue(e.target.value) 
    }
    const setInputValueDeb =(e) =>{
        setValueDeb(e.target.value) 
    }
    return (
        <div>
            <p>Input debounced (variant 1)</p>
            <input onChange={setInputValue} type="text" value={value}/>
            <p>Input debounced (variant 2)</p>
            <input onChange={setInputValueDeb} type="text" value={valueDeb}/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ex nemo, dicta, ab adipisci ducimus hic, dolor officia facere doloribus vero laudantium culpa unde aut iusto incidunt illo voluptates quasi.
            Fuga aspernatur laborum assumenda, modi veritatis, perspiciatis aut praesentium esse optio non consequatur nesciunt similique maxime laboriosam ea. Adipisci culpa totam eum. Quasi amet alias explicabo saepe voluptatem numquam id!
            Recusandae natus accusamus sed atque impedit amet provident nam dignissimos explicabo rem? Exercitationem cupiditate ab, alias recusandae corrupti ullam iure a quidem quo aut nam mollitia, est aliquid, aspernatur incidunt.
            Ducimus, numquam commodi mollitia qui accusamus nostrum delectus quod inventore soluta earum saepe sequi quae dolore accusantium, asperiores culpa voluptatem magni blanditiis illum expedita. Ex culpa sapiente facere veniam cumque.
            Blanditiis dolores dolore laudantium sequi illum, voluptatibus quidem! Ad, doloremque. Nemo, odio. Dolor magnam, odio tempore numquam aspernatur impedit fuga facilis beatae distinctio, quisquam itaque deserunt est tenetur, temporibus dicta.
            Reiciendis veritatis eaque aut quaerat, dicta facilis nobis placeat asperiores repellat nostrum a. Sed unde illum excepturi totam animi iusto laudantium commodi, impedit, non similique ut, eum quasi repudiandae cupiditate.
            Quae aperiam dolore eius ullam quo dolorem debitis doloremque maxime nostrum omnis error doloribus, neque repudiandae perspiciatis expedita suscipit ipsam pariatur numquam ut fugit sint exercitationem consectetur. Doloremque, ea corporis.
            Magni exercitationem ipsa quae! Blanditiis cumque error odit corrupti. Unde atque, deleniti doloremque laudantium animi fugit magni ut corporis, recusandae incidunt beatae voluptate ea itaque debitis mollitia, ratione voluptatibus illum.
            Aliquid, sit recusandae qui ipsam, fuga cupiditate eaque earum ab quia sapiente obcaecati libero commodi unde reprehenderit inventore ipsum sunt pariatur nobis repudiandae, excepturi similique aliquam maiores! Accusantium, reiciendis iusto.
            Provident vel repudiandae repellendus ea fugiat. Nobis quidem aperiam distinctio alias! Nihil, molestias magnam? Sapiente hic aspernatur vitae veritatis commodi eum culpa numquam maxime reiciendis illo aliquam corrupti, recusandae asperiores.
            Labore repudiandae voluptate velit nam eos asperiores iste, modi fuga delectus minima incidunt porro? Accusamus corrupti quas, placeat alias officiis nobis et maxime? Voluptate iste molestias nesciunt sequi numquam ad.
            Corrupti error commodi ducimus ut nam optio excepturi delectus ipsum vero, iure rem placeat corporis veniam deserunt necessitatibus soluta dicta similique asperiores alias dignissimos. Inventore aliquid nesciunt quas consequatur iusto.
            Excepturi, aspernatur ea rerum blanditiis ad voluptatem assumenda libero quas amet minima exercitationem itaque quos explicabo aliquam quam quidem sunt neque alias nesciunt? Nam, eum provident ratione sint laborum vitae?
            Eius, ipsa modi? Quos nisi accusamus, nesciunt incidunt aut dolores ducimus exercitationem iusto temporibus quas optio! Cupiditate, soluta, asperiores doloremque ipsum distinctio expedita quis, velit excepturi nam repudiandae labore dicta!
            Ipsum aperiam officiis magnam enim ex maxime deleniti at odio, fuga laboriosam laborum, rem aliquam inventore animi quis nihil commodi molestias? Dolore incidunt laboriosam corrupti ratione, doloremque totam distinctio consectetur!
            Rem minima doloribus nisi exercitationem voluptas commodi omnis repellat officiis eaque sequi. Maiores, reprehenderit dolorum tempora magnam nulla a aliquam sequi, eos delectus ullam porro quae blanditiis ut distinctio facilis.
            Eos harum itaque cupiditate voluptatem tempora tempore perferendis veritatis velit corporis! Vitae fuga ex aliquid. Aperiam quasi quam numquam aliquam, adipisci dicta voluptates sint accusantium distinctio nostrum exercitationem repudiandae nihil!
            Hic odit facilis temporibus labore tempore eos quae quam, dicta voluptatum. Libero sequi eum est ut veritatis unde sapiente fuga cumque ipsam possimus in aut dolore, reprehenderit nobis dolores consequatur!
            Ipsum sint aspernatur cumque consequuntur omnis unde aliquam velit mollitia neque in sit non, saepe a debitis illum, ipsam facere! Ab non quod amet laboriosam saepe sit sed. Aut, ab.
            Eum rerum delectus nostrum esse? Voluptatibus debitis, provident corporis voluptatem dolore libero ut labore dignissimos, vel dolores tempora magnam laboriosam odit reiciendis exercitationem dolorem distinctio esse repudiandae? Nostrum, ad dicta?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam provident, fuga rerum vitae dolorem adipisci magni qui excepturi laudantium temporibus? Aliquid explicabo fugiat mollitia, tempora quis eius veniam asperiores delectus!
            Debitis voluptatem maiores incidunt cum necessitatibus maxime repellendus, omnis facilis cumque commodi! Dolores laborum debitis accusantium necessitatibus culpa architecto eius velit tenetur labore tempora nihil ducimus quaerat, libero minima maiores.
            Optio delectus fuga obcaecati est, laudantium esse quam placeat magnam tenetur hic cumque unde deleniti possimus. Quasi, doloremque! Dolores officiis iure aut doloremque reiciendis numquam dolore provident dolorem earum nesciunt.
            Veritatis iste quaerat, laboriosam deleniti quas saepe aperiam, ipsam a porro incidunt impedit cum, dolorum nesciunt perspiciatis. Eveniet placeat corrupti quod asperiores eaque non amet error aliquam, doloremque quo tempore!
            Pariatur unde nam ea dolorum! Inventore praesentium dolor laudantium totam sapiente vero magni possimus harum facilis eveniet debitis repellendus natus quisquam tempora, atque minima veniam expedita quas iusto accusantium esse?
            Eius voluptate laboriosam excepturi. Inventore quaerat, impedit excepturi, nemo animi repudiandae accusamus placeat quidem ex, velit repellendus voluptate ipsa amet atque. Facere dignissimos optio earum! Placeat possimus id accusantium excepturi.
            Excepturi, cupiditate dolorem quis saepe eos nihil aliquam. Magni asperiores error veniam quia sit eligendi illo in dolorem incidunt accusantium nam animi at, libero accusamus. Voluptates nihil dolores maxime fuga.
            Labore ut maxime qui, non facilis voluptatibus cupiditate dolore molestias nam totam, voluptates ducimus eum quas ab et voluptatum adipisci nisi consequuntur repudiandae sed officiis harum! Architecto aperiam minima assumenda.
            Eius ad, dolorum expedita explicabo ipsam cupiditate nesciunt eveniet tenetur accusantium ratione blanditiis incidunt, voluptatem velit iusto sequi nihil officiis quaerat commodi id modi esse repellendus. Dolore saepe maiores eligendi!
            Obcaecati consectetur ratione ipsum suscipit, nesciunt qui? Maiores velit, libero consequatur eveniet neque perspiciatis. Id dignissimos cupiditate, cum, ab vero dolore eius veniam atque velit, placeat harum adipisci quia amet!
            Tenetur temporibus dolorem at? Ipsa, laboriosam vero sequi aliquid aperiam adipisci! Similique distinctio sequi aperiam exercitationem aliquam, iste error possimus voluptate repellendus et ipsum, quos, autem voluptatibus quo odit consequuntur!
            Necessitatibus, fugiat earum quasi quibusdam dignissimos laboriosam, sint saepe culpa cupiditate soluta laudantium quo quisquam provident nam iste sit inventore sed ex blanditiis atque voluptatum. Architecto repellat aut similique ullam?
            Quos facilis molestiae et perspiciatis sequi voluptatum iusto culpa error? Temporibus illo, enim reiciendis id cupiditate aliquid sint voluptatem ex perspiciatis nesciunt tempora libero aliquam laborum voluptatibus minima perferendis ea?
            In, eligendi blanditiis aliquid quis sequi debitis rem. Reprehenderit architecto sed temporibus! Quod reprehenderit optio eaque, voluptates nesciunt voluptatibus eum placeat unde ipsa quos voluptas, dicta est sint rem quo.
            Ad at vitae ullam nostrum possimus sit aperiam eligendi quam porro reprehenderit, autem quidem nemo ipsum quae incidunt, blanditiis quia repellendus saepe eum eos, consequatur dicta? Incidunt, quidem sed. Nam.
            Officiis, dicta! Totam, consectetur sint! Ut exercitationem error hic. Commodi nulla provident dolore rem perferendis voluptatum esse totam, velit quidem debitis adipisci veritatis eum repudiandae at facere excepturi beatae soluta.
            A inventore odit officia architecto dolores, magnam perferendis mollitia eaque consequatur consequuntur obcaecati sunt tenetur cumque unde sapiente excepturi accusantium ad nam magni vero reiciendis quae laboriosam! Hic, illo obcaecati.
            Culpa cumque odio esse, hic similique voluptatibus quisquam, ab magni modi eligendi dolorum sapiente vero repellat a officiis quas sunt provident inventore qui. Tempora veniam quia dolor deserunt dolore fuga.
            Eos aliquam quod ab repellat ex ipsam perspiciatis eius quasi perferendis, exercitationem ducimus error tenetur earum autem nemo. Repellendus vel enim maiores repudiandae molestiae molestias laborum. Eveniet iste maiores excepturi!
            Neque facilis aut expedita maiores fuga error inventore enim! Accusantium voluptatum ab possimus harum quia, rerum temporibus consequuntur repudiandae dignissimos ad quidem autem odit dolor? Aliquam nam dignissimos possimus blanditiis!
        </div>
    )
}

export default connect(null,{inputSetValueSaga, inputSetValueSaga2 })( InputDebounced)

