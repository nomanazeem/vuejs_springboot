package nazeem.security;


import nazeem.security.model.ERole;
import nazeem.security.model.Role;
import nazeem.security.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class SetupData implements ApplicationListener<ContextRefreshedEvent> {
    boolean alreadySetup = false;

    @Autowired
    private IRoleRepository roleRepository;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (alreadySetup)
            return;

        createRoleIfNotFound(ERole.USER.name());
        createRoleIfNotFound(ERole.MODERATOR.name());
        createRoleIfNotFound(ERole.ADMIN.name());
    }

    @Transactional
    void createRoleIfNotFound(String name) {
        Role role = roleRepository.findByName(name);
        if(role == null){
            Role r = new Role(name);
            roleRepository.save(r);
        }
    }

}
