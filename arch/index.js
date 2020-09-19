const fdisk = require("fdisk");
const readline = require("readline");
const select_a_thingie = require("select-a-thingie");

let partition = "";

const longestItem = (array) => {
    let longest = 0;
    array.forEach(item => {
        if (item.length > longest) longest = item.length;
    });
    return longest;
};

const startingPage = () => {
    console.clear();
    process.stdout.write([
        "Welcome to the archlinux installer!",
        "",
        "Press enter to continue the setup..."
    ].join("\n"));
    setTimeout(() => {
        selectPartition();
    }, 15 * 1000);
};

const selectPartition = () => {
    let partitions = [];

    fdisk.listDisks().filter(i => i.startsWith("/dev/sd")).forEach(disk => {
        fdisk.listDiskPartitions(disk).forEach(part => {
            partitions.push(fdisk.getPartitionInfo(part));
        });
    });
    
    console.log(partitions);
    process.exit();

    let sel = [];

    let parts = [];
    let size = [];
    partitions.forEach(i => {
        parts.push(i.device);
        size.push(i.size);
    });

    partitions.forEach(i => {
        sel.push(i.device + " ".repeat(longestItem(parts) - i.device.length) + ", " + i.size + " ".repeat(longestItem(size) - i.size.length) + ", " + i.type);
    });

    select_a_thingie(sel, "ascii", "Select the partition you want to install archlinux to\n", (index) => {
        partition = parts[index];
        doFormat();
    });
};

const doFormat = () => {
    select_a_thingie(["Yes", "No"], "ascii", "You selected " + partition + ". Do you want to format it?\n", (index) => {
        console.clear();

        if (index != 0) {
            console.log("Alright, exiting...");
            process.exit();
        }

        console.log("Alright, formatting...");
        // formatting command here
        installArch();
    });
};

const installArch = () => {
    console.log(partition);
    process.exit();
};

startingPage();
