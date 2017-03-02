
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import com.kirak.conf.BasicConfig;


/**
 * Created by Kir on 02.03.2017.
 */

//Surfing-through-page test performing CRUD tasks
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = BasicConfig.class)
public class SurfTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;


    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void crudTesting() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/all"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getById/1"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getById/10"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getById/100"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getById/500"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getPage/2/8?sortType=desc&sortField=age"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getPage/3/2?sortType=asc&sortField=age"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getPage/4/1?sortType=desc&sortField=isAdmin"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getPage/7/1?ageMoreThanFilter=5"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(MockMvcRequestBuilders.get("/crud/getPage/11/1?ageMoreThanFilter=5"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());


    }

}
