export interface Member {
 image: string,
 imageAlt: string,
 name: string,
 occupation: string,
}

export interface membersData {
    [key: string]: Member;
}

