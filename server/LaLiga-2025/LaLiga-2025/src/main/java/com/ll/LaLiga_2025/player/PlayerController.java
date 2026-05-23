package com.ll.LaLiga_2025.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/player")
public class PlayerController {

    private final PlayerService _service;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this._service = playerService;
    }

    @GetMapping
    public List<Player> getPlayers
            (@RequestParam(required = false) String name,
             @RequestParam(required = false) String team,
             @RequestParam(required = false) String position,
             @RequestParam(required = false) String nation,
             @RequestParam(required = false) Integer goals,
             @RequestParam(required = false) Integer assists,
             @RequestParam(required = false) Integer ga)
    {
        if(team != null){
            return _service.getPlayersByTeam(team);
        }
        else if(nation != null){
            return _service.getPlayersByNation(nation);
        }
        else if(position != null){
            return _service.getPlayersByPos(position);
        }
        else if(name != null){
            return _service.getPlayersByName(name);
        }
        else if(goals != null){
            return _service.getPlayersByGoals(goals);
        }
        else if(assists != null){
            return _service.getPlayersByAssists(assists);
        }
        else if(ga != null){
            return _service.getPlayersByGA(ga);
        }
        else{
            return _service.getPlayers();
        }
    }//get mapping
}//end class
