import java.util.*;

public class hasPhobia {

    public static boolean check(String[] phobia, String[] descriptions) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        for (String scaryStuff : phobia)
            map.put(scaryStuff, false);
        for (String word : descriptions) {
            if (!map.containsKey(word))
                map.put(word, false);
            else
                return true;
        }
        return false;
    }
}
