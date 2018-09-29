package decoder;

import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class OpcodeDecoder {
    private Integer opcodeValue;
    private Map<String,Integer> opcodeDecoder = new HashMap<String, Integer>();

    public OpcodeDecoder() throws IOException {
        parseOpcodeFile();
    }

    private void parseOpcodeFile() throws IOException {
        URL path = OpcodeDecoder.class.getResource("opcodefile.txt");
        File f = new File(path.getFile());
        BufferedReader reader = new BufferedReader(new FileReader(f));
        String st;
        while ((st = reader.readLine()) != null)
            System.out.println(st);
    }




//    public void getOpcodeValue(String opcodeValue){
//
//    }
}
