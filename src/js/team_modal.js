
import * as basicLightbox from 'basiclightbox';
import confetti from 'canvas-confetti';

import vadimUrl from '../images/team_photo/vadim.webp';
import elenaUrl from '../images/team_photo/elena.webp';
import arturUrl from '../images/team_photo/artur.webp';
import artemUrl from '../images/team_photo/artem.webp';
import ivanUrl from '../images/team_photo/ivan.webp';
import denisUrl from '../images/team_photo/denis.webp';
import olexanderUrl from '../images/team_photo/olexander.webp';
import kristinaUrl from '../images/team_photo/kristina.webp';
import vitaliyUrl from '../images/team_photo/vitaliy.webp';
import olenaUrl from '../images/team_photo/olena.webp';
import goitUrl from '../images/team_photo/goit.webp';
import dmytroUrl from '../images/team_photo/dmytro.webp';
import github_iconUrl from '../images/icons/github_icon.svg';




 const team = [
    {   photo: `${vadimUrl}`,
        name: 'Vadim',
        role: 'Team-lead',
        github_Url: "https://github.com/vadimvatsenko",
    },
     {  photo: `${elenaUrl}`,
        name: 'Elena',
        role: 'Scrum-master',
        github_Url: "https://github.com/ElenaObukhova1984",
    },
      { photo: `${arturUrl}`,
        name: 'Artur',
        role: 'Developer',
        github_Url: "https://github.com/arturtretyak",
   },
      { photo: `${artemUrl}`,
        name: 'Artem',
        role: 'Developer',
        github_Url: "https://github.com/artipavl",
   },
      { photo: `${ivanUrl}`,
        name: `Ivan`,
        role: 'Developer',
        gihhub_Url: "https://github.com/Ivan-Prystay",
   },
      { photo: `${denisUrl}`,
        name: 'Denis',
        role: 'Developer',
        github_Url: "https://github.com/Den1sKruglov",
   },
      { photo: `${olexanderUrl}`,
        name: 'Olexander',
        role: 'Developer',
        github_Url: "https://github.com/DiakovSasha",
   },
      { photo: `${kristinaUrl}`,
        name: 'Kristina',
        role: 'Developer',
        github_Url: "https://github.com/Ra4kovi4",
   },
      { photo: `${vitaliyUrl}`,
        name: 'Vitaliy',
        role: 'Developer',
        github_Url: "https://github.com/VitaliiBlyskun",
   },
      { photo: `${olenaUrl}`,
        name: 'Olena',
        role: 'Developer',
        github_Url: "https://github.com/elenakolyada",
   },
     {  photo: `${goitUrl}`,
        name: 'GOIT',
        role: 'School',
        github_Url: "https://github.com/goitacademy",
   },

      { photo: `${dmytroUrl}`,
        name: 'Dmytro',
        role: 'Developer',
        github_Url: "https://github.com/Hanych-IT",
    },
]




const markupTeamCard = team
  .map(({ photo, name, role, github_Url}) => {
    return `<li class="team-card">
             
               <img loading="lazy" src="${photo}" alt="${name}" class="team-photo">
               <div class = "team-info">
              <p class="team-name">${name}</p>
               <a href="${github_Url}" class="team-git">
               <img class="github_icon" src="${github_iconUrl}" alt="github icon" width="30" />
              </a></div>
              <p class="team-role">${role}</p>
              

              </li>`;
  })
  .join('');

const markupTeamModal = `<p class="team-title">OUR<span class="space"></span>TEAM</p>
<ul class="team-wrapper">
${markupTeamCard}
</ul>`;


    
const container = document.querySelector('.footer__team-open-btn');
container.addEventListener('click', openModal);
const modal = basicLightbox.create(markupTeamModal);

function openConfetti() {
confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
})({ particleCount: 300, spread: 200, shapes: ['star'], scalar: 0.5, zIndex: 2000 });
}


function openModal(e) {
  e.preventDefault();
  openConfetti();
  modal.show();
  window.addEventListener('keydown', closeModalHandler);
 
  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
  }
























