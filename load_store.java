public static void load_store(int opCode, int r ,int i, int x, int address){
	//direct addressing
	int ea;//EA is the sum of the contents of the base register
	//load instruction
	if(opCode==1){
		if(i==0){
			if(x==0){
				ea=address;
				get_content(r)=get_content(ea);
			}
			else if(ix==1){
				ea=x0+address;
				get_content(r)=get_content(ea);
			}
		}
		else if(i==1){
			if(x==0){
				mar=address;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				ea=mbr;
				get_content(r)=get_content(ea);
			}
			else if(x==1){
				mar=x0+address;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				ea=mbr;
				get_content(r)=get_content(ea);
			}
		}
	}
	//store instruction
	else if(opCode==2){
		if(i==0){
			if(ix==0){
				get_content(ea)=get_content(r);
				
			}
			else if(x==1){
				r=x0+r;
				get_content(ea)=get_content(r);
			}
		}
		else if(i==1){
			if(x==0){
				mar=r;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				get_content(ea)=get_content(mbr);
			}
			else if(x==1){
				mar=x0+r;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				get_content(ea)=get_content(mbr);
			}
		}
	}
	else if(opCode==41){
		if(i==0){
			if(x==0){
				ea=address;
				get_content(x0)=get_content(ea);
			}
			else if(x==1){
				ea=x0+address;
				get_content(x0)=get_content(ea);
			}
		}
		else if(i==1){
			if(x==0){
				mar=address;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				ea=mbr;
				get_content(x0)=get_content(ea);
			}
			else if(x==1){
				mar=x0+address;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				ea=mbr;
				get_content(x0)=get_content(ea);
			}
		}
	}
	else if(opCode==42){
		if(i==0){
			if(x==0){
				get_content(ea)=get_content(x0);
			}
			else if(x==1){
				x0=x0+x0;
				get_content(ea)=get_content(x0);
			}
		}
		else if(i==1){
			if(x==0){
				mar=x0;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				get_content(ea)=get_content(mbr);
			}
			else if(x==1){
				mar=x0+x0;
				systemBus.addressBus(mar);
				mbr=systemBus.dataBus();
				get_content(ea)=get_content(mbr);
			}
		}
	}
}
