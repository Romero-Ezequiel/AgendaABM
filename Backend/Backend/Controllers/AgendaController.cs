﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models.Data;
using Backend.Models.Entities;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AgendaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Agenda
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agenda>>> GetAgenda()
        {
            return await _context.Agenda.ToListAsync();
        }

        // GET: api/Agenda/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Agenda>> GetAgenda(int id)
        {
            var agenda = await _context.Agenda.FindAsync(id);

            if (agenda == null)
            {
                return NotFound();
            }

            return agenda;
        }

        // PUT: api/Agenda/5
        // api/agenda 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgenda(int id, Agenda agenda)
        {
            if (id != agenda.Id)
            {
                return BadRequest();
            }

            _context.Entry(agenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgendaExists(id))
                {
                   return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Agenda
        [HttpPost]
        public async Task<ActionResult<Agenda>> PostAgenda(Agenda agenda)
        {
            _context.Agenda.Add(agenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgenda", new { id = agenda.Id }, agenda);
        }

        // DELETE: api/Agenda/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Agenda>> DeleteAgenda(int id)
        {
            var agenda = await _context.Agenda.FindAsync(id);
            if (agenda == null)
            {
                return NotFound();
            }

            _context.Agenda.Remove(agenda);
            await _context.SaveChangesAsync();

            return agenda;
        }

        private bool AgendaExists(int id)
        {
            return _context.Agenda.Any(e => e.Id == id);
        }
    }
}
