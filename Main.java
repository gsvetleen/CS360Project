import org.jsoup.Jsoup;
import org.jsoup.helper.Validate;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

import java.io.File;

public class Main {
    public static void main(String [] args) throws Exception {
        File input = new File("index.html");
		Document doc = Jsoup.parse(input, "UTF-8", "");
        System.out.print(doc);
    }
}