// The objective of the puzzle is to move the entire stack to another rod, obeying the following simple rules:
// Only one disk can be moved at a time.
// Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack.
// No disk may be placed on top of a smaller disk.
let disks = [{
        id: 'disc-1',
        order: 0
    },
    {
        id: 'disc-2',
        order: 1
    },
    {
        id: 'disc-3',
        order: 2
    },
    {
        id: 'disc-4',
        order: 3
    },
]


let topDisk;
let towerMode = 'source';
const out = document.getElementById('out')
out.textContent = out.textContent = 'Select a tower to move from';


const towers = document.querySelectorAll('.tower');

for (let item of towers) {
    item.addEventListener('click', handleClick);
}



function handleClick(event) {
    let tower = event.target;
    console.log("tower is ", tower);

    if (towerMode === 'source') {
        out.textContent = 'Select a tower to move  a disk onto';
        
        if (tower.lastElementChild) {
            console.log("lec", tower.lastElementChild);
            topDisk = tower.lastElementChild;
            towerMode = 'destination'
        } else {
            alert('invalid selection');
        }
    } else if (towerMode === 'destination') {
        out.textContent = out.textContent = 'Select a tower to move from';
        
        let targetChild = tower.lastElementChild
        if (isValidPlacement(topDisk, targetChild)) {
            console.log("First/taget", topDisk + ' ' + targetChild)
            tower.appendChild(topDisk);
            towerMode = 'source';
        } else {
            alert('Element too large to move there!');
            towerMode = 'source';
        }

    }
}



function isValidPlacement(selDisk, targetDisk) {
    if (targetDisk === null) {
        return true;
    } else {
        let selectedStyle = getComputedStyle(selDisk);
        let targetStyle = getComputedStyle(targetDisk);
        let selectedWidth = selectedStyle.getPropertyValue('width');
        let targetWidth = targetStyle.getPropertyValue('width');
        if (selectedWidth < targetWidth) {
            return true;
        } else {
            return false;
        }
    }
}