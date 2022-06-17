package nazeem.security.restcontroller;

import nazeem.security.model.Todo;
import nazeem.security.payload.response.MessageResponse;
import nazeem.security.repository.ITodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    private ITodoRepository todoRepository;

    @GetMapping("/list")
    public ResponseEntity<?> list(){
        return ResponseEntity.ok(todoRepository.findAll());
    }

    //http://localhost:9090/api/todo/search?query=&page=0&pageSize=5&sortBy=id_todo&sortDirection=2
    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam(value="query", defaultValue = "") String query
            ,@RequestParam(value="page", defaultValue = "1") int page
            , @RequestParam(value="pageSize", defaultValue = "5") int pageSize
            , @RequestParam(value="sortBy", defaultValue = "id") String sortBy
            , @RequestParam(value="sortDirection", defaultValue = "1") String sortDirection
    ){
        Sort sort = (sortDirection.equals("1")) ? Sort.by(Sort.Direction.ASC, sortBy) : Sort.by(Sort.Direction.DESC, sortBy);

        Page<Todo> todoList = todoRepository.searchTodo(query
                , PageRequest.of((--page), pageSize, sort));


        /*todoList.getContent();
        todoList.getTotalPages();
        todoList.getTotalElements();
        todoList.getNumber()+1;
        todoList.getSize();*/

        return ResponseEntity.ok(new MessageResponse(true, "Search data", todoList.getContent()
                    , todoList.getTotalElements(), todoList.getTotalPages(), todoList.getNumber()+1, todoList.getSize()));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Todo todo) {
        try{
            todoRepository.save(todo);
            return ResponseEntity.ok(new MessageResponse(true, "Data saved successfully.", todoRepository.save(todo)));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(new MessageResponse(false, ex.getMessage(),null));
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> get(@PathVariable("id") long  id) {
        Todo todo = todoRepository.findById(id).get();
        if(todo == null){
            return ResponseEntity.badRequest().body(new MessageResponse(false, "Not found...", null));
        }
        return ResponseEntity.ok(todoRepository.findById(id).get());
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        todoRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse(true, "Deleted successfully.", null));
    }

}
