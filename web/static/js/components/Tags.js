import React from 'react';
import DebounceInput from 'react-debounce-input';
import {connect} from 'react-redux';
import ItemTable from './ItemTable';

var actions = require('./../actions/index.js');

const Tags = (props) => {
  let handleChange = (event) => {
    $.getJSON('/api/search/?type=tags&term=' + event.target.value, (results) => {
      props.dispatch(actions.updateItems(results.data))
    })
  };

  return (
    <div>
      <div className="well well-sm">
        <div className="col-md-12">
          <p>Use dropdown to select tag:</p>
          <select className="form-control" defaultValue="" onChange={handleChange}>
            <option value="" disabled></option>
            <option value="agaran">agaran</option>
            <option value="alien">alien</option>
            <option value="alpine">alpine</option>
            <option value="ancient">ancient</option>
            <option value="apex">apex</option>
            <option value="apexcamp">apexcamp</option>
            <option value="apexmansion">apexmansion</option>
            <option value="apexmission1">apexmission1</option>
            <option value="apexresearchlab">apexresearchlab</option>
            <option value="apexvillage">apexvillage</option>
            <option value="astronaut">astronaut</option>
            <option value="avian">avian</option>
            <option value="avianairship">avianairship</option>
            <option value="aviantemple">aviantemple</option>
            <option value="aviantomb">aviantomb</option>
            <option value="avianvillage">avianvillage</option>
            <option value="bioluminescence">bioluminescence</option>
            <option value="bone">bone</option>
            <option value="cabin">cabin</option>
            <option value="cell">cell</option>
            <option value="christmas">christmas</option>
            <option value="colourful">colourful</option>
            <option value="combat">combat</option>
            <option value="commerce">commerce</option>
            <option value="cooking">cooking</option>
            <option value="copper">copper</option>
            <option value="coral">coral</option>
            <option value="crafting">crafting</option>
            <option value="crystalline">crystalline</option>
            <option value="dark">dark</option>
            <option value="doom">doom</option>
            <option value="door">door</option>
            <option value="electronic">electronic</option>
            <option value="evil">evil</option>
            <option value="executive">executive</option>
            <option value="explorer">explorer</option>
            <option value="eyepatch">eyepatch</option>
            <option value="farm">farm</option>
            <option value="farming">farming</option>
            <option value="fenerox">fenerox</option>
            <option value="flesh">flesh</option>
            <option value="floran">floran</option>
            <option value="floranhuntinggrounds">floranhuntinggrounds</option>
            <option value="floranprison">floranprison</option>
            <option value="floranvillage">floranvillage</option>
            <option value="fossil">fossil</option>
            <option value="foundry">foundry</option>
            <option value="frozenfire">frozenfire</option>
            <option value="geode">geode</option>
            <option value="geometric">geometric</option>
            <option value="giantflower">giantflower</option>
            <option value="glitch">glitch</option>
            <option value="glitchcastle">glitchcastle</option>
            <option value="glitchsewer">glitchsewer</option>
            <option value="glitchvillage">glitchvillage</option>
            <option value="gnome">gnome</option>
            <option value="gothic">gothic</option>
            <option value="hive">hive</option>
            <option value="hoard">hoard</option>
            <option value="human">human</option>
            <option value="humanbunker">humanbunker</option>
            <option value="humanprison">humanprison</option>
            <option value="humanvillage">humanvillage</option>
            <option value="hylotl">hylotl</option>
            <option value="hylotloceancity">hylotloceancity</option>
            <option value="hylotlvillage">hylotlvillage</option>
            <option value="ice">ice</option>
            <option value="island">island</option>
            <option value="jungle">jungle</option>
            <option value="knowledge">knowledge</option>
            <option value="light">light</option>
            <option value="lunarbase">lunarbase</option>
            <option value="mechanical">mechanical</option>
            <option value="mining">mining</option>
            <option value="misc">misc</option>
            <option value="mushroompatch">mushroompatch</option>
            <option value="musical">musical</option>
            <option value="naturalcave">naturalcave</option>
            <option value="nature">nature</option>
            <option value="novakid">novakid</option>
            <option value="novakidvillage">novakidvillage</option>
            <option value="oasis">oasis</option>
            <option value="ocean">ocean</option>
            <option value="odd">odd</option>
            <option value="opulent">opulent</option>
            <option value="outdoor">outdoor</option>
            <option value="outpost">outpost</option>
            <option value="pastel">pastel</option>
            <option value="pretty">pretty</option>
            <option value="prism">prism</option>
            <option value="protectorate">protectorate</option>
            <option value="retroscifi">retroscifi</option>
            <option value="rust">rust</option>
            <option value="saloon">saloon</option>
            <option value="sandstone">sandstone</option>
            <option value="science">science</option>
            <option value="scorched">scorched</option>
            <option value="sea">sea</option>
            <option value="serene">serene</option>
            <option value="slime">slime</option>
            <option value="spooky">spooky</option>
            <option value="spring">spring</option>
            <option value="steampunk">steampunk</option>
            <option value="steamspring">steamspring</option>
            <option value="stonecave">stonecave</option>
            <option value="storage">storage</option>
            <option value="swamp">swamp</option>
            <option value="tar">tar</option>
            <option value="tentacle">tentacle</option>
            <option value="tier1">tier1</option>
            <option value="tier2">tier2</option>
            <option value="tier3">tier3</option>
            <option value="tier4">tier4</option>
            <option value="toxic">toxic</option>
            <option value="trap">trap</option>
            <option value="traveller">traveller</option>
            <option value="valentines">valentines</option>
            <option value="valuable">valuable</option>
            <option value="volcanic">volcanic</option>
            <option value="wave">wave</option>
            <option value="wired">wired</option>
            <option value="wreck">wreck</option>
            <option value="zen">zen</option>
          </select>
        </div>
        <div className="clearfix"></div>
      </div>

      {props.items.length > 0 ? <ItemTable items={props.items} /> : ""}
    </div>
  );
}

export default connect(
  (state) => {
    return {
      items: state.items
    };
  }
)(Tags);
